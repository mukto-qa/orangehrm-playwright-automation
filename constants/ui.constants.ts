export const LOGIN_PAGE_CONSTANTS = {
  HEADER_TEXT: "Login",
} as const;

export const DASHBOARD_PAGE_CONSTANTS = {
  HEADER_TEXT: "Dashboard",
} as const;

export const USER_LIST_PAGE_CONSTANTS = {
  HEADER_TEXT: "User Management"
} as const;

export const ADD_USER_PAGE_CONSTANTS = {
  ADD_USER_FORM_HEADER: "Add User",
  ROLES: {
    ADMIN: "Admin",
    ESS: "ESS"
  },
  STATUSES: {
    ENABLED: "Enabled",
    DISABLED: "Disabled"
  },
}

export const TOAST_MESSAGES = {
  SUCCESS_SAVE: "Successfully Saved",     
}