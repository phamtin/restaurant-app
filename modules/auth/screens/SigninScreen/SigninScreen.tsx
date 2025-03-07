"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Button, Flex, Input, type InputRef, Typography } from "antd";
import styles from "./page.module.scss";
import { trpc } from "@/server/client";

const SigninScreen = () => {
  const router = useRouter();
  const ref = useRef<InputRef>(null);

  const signin = trpc.auth.signin.useMutation();

  const onSignin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!ref?.current?.input?.value) {
        return;
      }

      const result = await signin.mutateAsync({
        email: ref.current.input.value,
      });
      localStorage.setItem("auth_token", result.data.token);
      router.push("/home");
    } catch (error) {
      console.error("Signin Error: ", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Flex vertical>
        <Typography.Title level={3}>Welcome back 👋🏼</Typography.Title>
        <Typography.Text type="secondary">
          Sign in to save the world
        </Typography.Text>
        <br />
        <br />
        <Flex>
          <Input
            ref={ref}
            styles={{
              affixWrapper: {
                width: 400,
                paddingRight: 7,
              },
            }}
            placeholder="Email"
            size="large"
            suffix={
              <Button color="primary" variant="link" onClick={onSignin}>
                <ArrowRightIcon width={22} color="grey" />
              </Button>
            }
          />
        </Flex>
      </Flex>
    </div>
  );
};

export default SigninScreen;
