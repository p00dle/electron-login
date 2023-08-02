export function isMainModule(module: NodeModule) {
  return require.main === module;
}
