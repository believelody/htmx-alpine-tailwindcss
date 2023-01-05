import hbs from "express-hbs"; 

export default function(options) {
  // console.log("options : ", options);
  return Object.entries(options).filter(([key, value]) => typeof value !== "object" && value).map(([key, value]) => `${key}='${value}'`).join(" ");
}