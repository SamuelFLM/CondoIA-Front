module.exports = {
  extends: ["next/core-web-vitals"],
  rules: {
    // Desabilitar regras que podem causar problemas no build
    "@next/next/no-img-element": "off",
    "react/no-unescaped-entities": "off",
    "import/no-anonymous-default-export": "off",
  },
}
