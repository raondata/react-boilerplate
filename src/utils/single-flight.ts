/**
 * Single-flight 패턴 구현
 * 동일한 키에 대해 동시에 여러 요청이 들어와도 실제로는 1개만 실행하고
 * 나머지는 그 결과를 공유받는 방식
 */

interface FlightRequest<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (error: any) => void;
  subscribers: Array<{
    resolve: (value: T) => void;
    reject: (error: any) => void;
  }>;
}

class SingleFlight {
  private flights: Map<string, FlightRequest<any>> = new Map();

  /**
   * 키에 대해 단일 실행을 보장하는 함수
   * @param key 고유 키 (예: 'refresh-token', 'me-api')
   * @param fn 실행할 함수
   * @returns Promise<T>
   */
  async execute<T>(key: string, fn: () => Promise<T>): Promise<T> {
    // 이미 진행 중인 요청이 있으면 그것에 구독
    if (this.flights.has(key)) {
      const flight = this.flights.get(key)!;

      return new Promise<T>((resolve, reject) => {
        flight.subscribers.push({ resolve, reject });
      });
    }

    // 새로운 요청 시작
    let resolve: (value: T) => void;
    let reject: (error: any) => void;

    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });

    const flight: FlightRequest<T> = {
      promise,
      resolve: resolve!,
      reject: reject!,
      subscribers: [],
    };

    this.flights.set(key, flight);

    try {
      const result = await fn();

      // 성공 시 모든 구독자에게 결과 전달
      flight.resolve(result);
      flight.subscribers.forEach((sub) => sub.resolve(result));

      return result;
    } catch (error) {
      // 실패 시 모든 구독자에게 에러 전달
      flight.reject(error);
      flight.subscribers.forEach((sub) => sub.reject(error));

      throw error;
    } finally {
      // 완료 후 정리
      this.flights.delete(key);
    }
  }

  /**
   * 특정 키의 진행 중인 요청 취소
   */
  cancel(key: string) {
    if (this.flights.has(key)) {
      const flight = this.flights.get(key)!;
      const error = new Error(`Single-flight cancelled: ${key}`);

      flight.reject(error);
      flight.subscribers.forEach((sub) => sub.reject(error));

      this.flights.delete(key);
    }
  }

  /**
   * 모든 진행 중인 요청 취소
   */
  cancelAll() {
    const keys = Array.from(this.flights.keys());
    keys.forEach((key) => this.cancel(key));
  }

  /**
   * 현재 진행 중인 요청들 확인
   */
  getActiveFlights(): string[] {
    return Array.from(this.flights.keys());
  }
}

// 전역 인스턴스
export const singleFlight = new SingleFlight();

export default SingleFlight;
