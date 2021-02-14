import { getBreadcrumbConfig } from '../AppWrap/BreadCrumbUtils'

it('extract path config from simple pathname', () => {
  const pathname = '/pagina-principal'

  const result = getBreadcrumbConfig(pathname)

  expect(result).toStrictEqual([
    {
      isCurrentPath: true,
      isFinalPath: true,
      isNew: false,
      path: 'pagina-principal',
      pathPart: 'pagina-principal',
    },
  ])
})

it('should extract path config from identified pathname', () => {
  const pathname = '/products/9'

  const result = getBreadcrumbConfig(pathname)

  expect(result).toStrictEqual([
    {
      isCurrentPath: true,
      isFinalPath: false,
      isNew: false,
      path: 'products',
      pathPart: 'products',
    },
    {
      isFinalPath: true,
      isId: true,
      isNew: false,
      path: 'products/9',
      pathPart: '9',
    },
  ])
})

it('should extract path config from long pathname', () => {
  const pathname = '/a/b/c/d/e'

  const result = getBreadcrumbConfig(pathname)

  expect(result).toStrictEqual([
    {
      isFinalPath: false,
      isNew: false,
      path: 'a',
      pathPart: 'a',
    },
    {
      isFinalPath: false,
      isNew: false,
      path: 'a/b',
      pathPart: 'b',
    },
    {
      isFinalPath: false,
      isNew: false,
      path: 'a/b/c',
      pathPart: 'c',
    },
    {
      isFinalPath: false,
      isNew: false,
      path: 'a/b/c/d',
      pathPart: 'd',
    },
    {
      isCurrentPath: true,
      isFinalPath: true,
      isNew: false,
      path: 'a/b/c/d/e',
      pathPart: 'e',
    },
  ])
})
