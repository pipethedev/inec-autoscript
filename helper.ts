function uppercaseToCamelCase(text: string): string {
  return text[0] + text.slice(1).toLocaleLowerCase();
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export {
  delay,
  uppercaseToCamelCase
}