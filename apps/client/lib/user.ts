import client from "@/db";

export const GetUserInfo = async (email: string) => {
  try {
    const userInfo = await client.user.findFirst({ where: { email } });
    return userInfo;
  } catch (error) {
    console.log(error);
  }
};
