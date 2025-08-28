import { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  VStack,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { H1, H3 } from '@components/texts';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import Logo from '@assets/logo.png';
import { useMutation } from '@hooks/api';
import { useAtom } from 'jotai';
import { accessTokenAtom, refreshTokenAtom } from '@atoms/global-atom';
import { useNavigate } from 'react-router';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [, setAccessToken] = useAtom(accessTokenAtom);
  const [, setRefreshToken] = useAtom(refreshTokenAtom);
  const toast = useToast();
  const navigate = useNavigate();

  const loginMutation = useMutation<LoginResponse>(
    {
      type: 'post',
      url: '/signin',
    },
    { requestType: 'login' }
  );

  const handleLogin = async () => {
    if (!username || !password) {
      toast({
        title: '입력 오류',
        description: '아이디와 비밀번호를 모두 입력해주세요.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const result = await loginMutation.mutateAsync({
        username,
        password,
      });

      if (result && result.accessToken && result.refreshToken) {
        setAccessToken(result.accessToken);
        setRefreshToken(result.refreshToken);
        toast({
          title: '로그인 성공',
          description: '환영합니다!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        // 로그인 성공 후 메인 페이지로 이동
        navigate('/');
      }
    } catch (error) {
      toast({
        title: '로그인 실패',
        description: '아이디 또는 비밀번호를 확인해주세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Center w="full" h="100vh" bg="gray.50">
      <Box
        w="full"
        maxW="400px"
        p={8}
        bg="white"
        rounded="lg"
        shadow="lg"
        border="1px"
        borderColor="gray.200"
      >
        <VStack spacing={6} align="center">
          {/* 로고 */}
          <Image w="auto" h={12} src={Logo} />

          {/* 제목 */}
          <VStack spacing={2} textAlign="center">
            <H1>로그인</H1>
            <H3 color="gray.600">계정에 로그인하세요</H3>
          </VStack>

          {/* 로그인 폼 */}
          <VStack spacing={4} w="full">
            <FormControl>
              <FormLabel>아이디</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="아이디를 입력하세요"
                size="lg"
              />
            </FormControl>

            <FormControl>
              <FormLabel>비밀번호</FormLabel>
              <InputGroup size="lg">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="비밀번호를 입력하세요"
                />
                <InputRightElement>
                  <IconButton
                    aria-label={
                      showPassword ? '비밀번호 숨기기' : '비밀번호 보기'
                    }
                    icon={showPassword ? <IoEyeOff /> : <IoEye />}
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                    size="sm"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              w="full"
              size="lg"
              colorScheme="blue"
              onClick={handleLogin}
              isLoading={loginMutation.isPending}
              loadingText="로그인 중..."
            >
              로그인
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default LoginPage;
