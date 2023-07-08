import * as statusCodes from "../../../../shared/settings/httpStatusCodes.json";
import { describe, expect, beforeAll, it } from "@jest/globals";
import { IAuthorization } from "../../contracts/IAuthorization";
import { AuthorizeUseCase } from ".";
import resources, {
  resourceKeys,
} from "../../../../shared/locals/errorMessages";
import Cipher from "../../../../shared/utils/Cipher";
import AppSettings from "../../../../shared/settings/AppSettings";
import { tokenDtoMock } from "../../../../mocks/TokenDto.mock";
import { mock } from "jest-mock-extended";

const authorization = mock<IAuthorization>();

const authorizationUseCase = new AuthorizeUseCase(authorization);

describe("Authorization by apiKey for consume api test ", () => {
  beforeAll(() => {
    resources.init("en");
    Cipher.init("password_key_test");
    AppSettings.defaultApiKey = "loclahost";
  });

  it("Should return a error if, apiKey was null", async () => {
    // Act
    const result = await authorizationUseCase.execute(null, null);

    // Assert
    expect(result.success).toBeFalsy();
    expect(result.error).toBe("Some required values are missing: domain, apiKey.");
    expect(result.statusCode).toBe(statusCodes.BAD_REQUEST);
  });

  it("Should return a error UNAUTHORIZED, if the apikey was error", async () => {
    // Arrang

    const domain = "localhost:6040";
    const apiKey = "12365873";

    // Act
    const result = await authorizationUseCase.execute(apiKey, domain);

    // Assert
    expect(result.success).toBeFalsy();
    expect(result.error).toBe(resources.get(resourceKeys.UNAUTHORIZED));
    expect(result.statusCode).toBe(statusCodes.UNAUTHORIZED);
  });
});
