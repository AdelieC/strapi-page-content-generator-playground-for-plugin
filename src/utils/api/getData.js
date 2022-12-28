import db from "./db";

const getData = async (key) => {
  try {
    const res = await db?.[key];
    return res || [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export default getData;
