import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.SALT_ROUNDS
    );
    return { success: true, pass: hashedPassword };
  } catch (error) {
    return { success: false, error };
  }
};

export const verifyPassword = async (password, hash) => {
  try {
    const verify = await bcrypt.compare(password, hash);
    return verify;
  } catch (error) {
    console.log(error);
    throw new Error("Error verifying the password");
  }
};
