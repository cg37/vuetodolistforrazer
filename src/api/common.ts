// src/utils/api.ts
import axios from "axios";

// 创建基础实例
const http = axios.create({
  baseURL: "/", // public目录的根路径
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

export const fetchJson = <T>(path: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    http
      .get(path)
      .then((response) => {
        // 确保返回的是有效JSON数据
        if (typeof response.data === "object") {
          resolve(response.data);
        } else {
          try {
            const parsed = JSON.parse(response.data);
            resolve(parsed);
          } catch (e) {
            reject(new Error("Invalid JSON format", e));
          }
        }
      })
      .catch((error) => {
        // 统一错误处理
        const errMsg = error.response
          ? `请求失败: ${error.response.status} ${error.response.statusText}`
          : error.message || "未知错误";
        reject(new Error(errMsg));
      });
  });
};
