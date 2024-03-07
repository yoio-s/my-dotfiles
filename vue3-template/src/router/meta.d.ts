import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta
    extends Partial<{
      // 这里配置路由 meta 的类型
    }> {
    [key in string]?: unknow
  }
}
