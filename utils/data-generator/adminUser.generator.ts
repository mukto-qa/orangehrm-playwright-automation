import { faker } from "@faker-js/faker";
import addUserData from "../../test-data/admin/add-user.data.json"
import { ADD_USER_PAGE_CONSTANTS } from "../../constants/pages/add-user.page.constants";

export const generateAdminUser = () => ({
  role: ADD_USER_PAGE_CONSTANTS.ROLES.ADMIN,
  status: ADD_USER_PAGE_CONSTANTS.STATUSES.ENABLED,
  employeeName: addUserData.validAdminUser.employeeName,
  username: faker.internet.username(),
  password: "Test@123" // keeping this static for now
});