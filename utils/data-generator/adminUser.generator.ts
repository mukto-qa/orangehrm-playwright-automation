import { faker } from "@faker-js/faker";
import { ADD_USER_PAGE_CONSTANTS } from "../../constants/ui.constants";
import addUserData from "../../test-data/admin/add-user.data.json"

export const generateAdminUser = () => ({
  role: ADD_USER_PAGE_CONSTANTS.ROLES.ADMIN,
  status: ADD_USER_PAGE_CONSTANTS.STATUSES.ENABLED,
  employeeName: addUserData.validAdminUser.employeeName,
  username: faker.internet.username(),
  password: "Test@123"
});