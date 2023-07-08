import { ApplicationAuditRepository } from "../../../repositories/audit/ApplicationAuditRepository";
import { UserRepository } from "../../../repositories/user/UserRepository";

const applicationAuditRepository = new ApplicationAuditRepository();
const userRepository = new UserRepository();

export {applicationAuditRepository, userRepository}