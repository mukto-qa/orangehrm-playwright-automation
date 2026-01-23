import { faker } from "@faker-js/faker";
import { ADD_USER_PAGE_CONSTANTS } from "../constants/pages/add-user.page.constants";
import { validAdminUser } from "./user.data";
import { UserData } from "./user.types";

export const generateAdminUser = (
  overrides: Partial<UserData> = {},
): UserData => {
  return {
    role: ADD_USER_PAGE_CONSTANTS.ROLES.ADMIN,
    status: ADD_USER_PAGE_CONSTANTS.STATUSES.ENABLED,
    employeeName: validAdminUser.employeeName,
    username: faker.internet.username(),
    password: validAdminUser.password,
    ...overrides,
  };
};