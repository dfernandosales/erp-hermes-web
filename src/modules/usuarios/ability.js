import { AbilityBuilder } from "@casl/ability";

const subjectName = subject =>
  !subject || typeof subject === "string" ? subject : subject.__type;

export default usuario => {
  return AbilityBuilder.define({ subjectName }, (can, cannot) => {
    if (!usuario) return;

    if (usuario.role?.includes("ADMIN")) {
      can("manage", "all");
    }
    if (usuario.role?.includes("USER")) {
      cannot("manage", "all");
      can("read", "viagens");
    }
  });
};
