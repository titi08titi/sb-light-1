import { useTheme } from '@mui/material'

import clsx from 'clsx'
import { NextPage } from 'next'
import { FunctionComponent, Fragment, PropsWithChildren, useMemo } from 'react'

import { Head, Footer, MenuAppBar } from '#components/common'
import BreadCrumbs from '#components/common/BreadCrumbs'
import { SITE_NAME } from '#utils/constants'

export interface LayoutConfigProps {
  title: string
  className?: string
}

export type UnknownProps = Record<string, any>

export const MainLayoutPage: FunctionComponent<PropsWithChildren<LayoutConfigProps>> = (props) => {
  const { children, className, title: titleProps } = props
  const theme = useTheme()

  const title = titleProps?.includes(SITE_NAME) ? titleProps : `${titleProps} | ${SITE_NAME}`

  return (
    <Fragment>
      <Head title={title} />
      <div className={clsx(['flex flex-col min-h-screen', className])} style={{ backgroundColor: theme.palette.background.default }}>
        {children}
      </div>
    </Fragment>
  )
}

/**
 * Higher-order component that wraps the provided component in a `<MainLayoutPage>` component.
 * Of course, you can create your new Layout with this template!
 * @param PageComponent - The page component to wrap with the layout
 * @param layoutProps - The props to pass to the layout
 * @returns - NextPage
 */
export const withMainLayoutPage = <T extends UnknownProps>(
  PageComponent: NextPage<T>,
  layoutProps: LayoutConfigProps | ((pageProps: T) => LayoutConfigProps)
) => {
  const LayoutPage: FunctionComponent<T> = (pageProps) => {
    const layoutPropsWithPageProps = useMemo(() => {
      return typeof layoutProps === 'function' ? layoutProps(pageProps) : layoutProps
    }, [pageProps])

    return (
      <MainLayoutPage {...layoutPropsWithPageProps}>
        <MenuAppBar>
          <BreadCrumbs className="mb-2" />
          <PageComponent {...pageProps} />
        </MenuAppBar>
        <Footer />
      </MainLayoutPage>
    )
  }
  return LayoutPage
}

export default MainLayoutPage