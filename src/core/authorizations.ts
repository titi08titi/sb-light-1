import { Feature, Role, SbPage } from '#utils/constants'

export const Authorizations = [
  
  {
    page: SbPage.home,
    authorizedRoles: [Role.admin, Role.support, Role.accountingManager, Role.accountingUser, Role.fiscalreportManager, Role.visitor],
    features: [],
  },
  {
    page: SbPage.intrastat,
    authorizedRoles: [Role.admin, Role.accountingManager, Role.accountingUser, Role.support, Role.fiscalreportManager],
    features: [],
  },
  {
    page: SbPage.manageIntrastat,
    authorizedRoles: [Role.admin, Role.accountingManager, Role.fiscalreportManager],
    features: [
      {
        feature: Feature.validateIntrastat,
        authorizedRoles: [Role.admin, Role.accountingManager, Role.fiscalreportManager],
      },
    ],
  },
]

export const hasPageAccess = (page: string, roles: string[]) => {
  const pageAuthorization = Authorizations.find((access) => access.page === page)
  return pageAuthorization != null && pageAuthorization.authorizedRoles.some((authorizedRole) => roles.indexOf(authorizedRole) >= 0)
}

export const hasFeatureAccess = (page: string, feature: string, roles: string[]) => {
  const pageAuthorization = Authorizations.find((access) => access.page === page)
  if (!pageAuthorization) {
    return false
  }
  const features = pageAuthorization.features ?? []
  if (features.length === 0) {
    return true
  }
  const featureAuthorization = features.find((featureAuthorization) => featureAuthorization.feature === feature)
  if (featureAuthorization) {
    return featureAuthorization.authorizedRoles.some((authorizedRole) => roles.indexOf(authorizedRole) >= 0)
  }
  return false
}
