using System.Collections.Generic;
using IdentityServer4.Models;

namespace SkillLearn.Identity
{
    public class IdentityConfig
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email()
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                // example code
                new ApiResource("SkillLearn.Api")
                {
                    ApiSecrets =
                    {
                        new Secret("SkillLearnApiSecret".Sha256())
                    },
                    Scopes = new[]{ "SkillLearn_Api" },
                    UserClaims = { "role", "admin", "user", "SkillLearnApiSecret", "SkillLearnApiSecret.admin", "SkillLearnApiSecret.user" }
                },
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientName = "Code Flow with refresh tokens",
                    ClientId = "SkillLearn.SPA",
                    AccessTokenLifetime = 360,// 360 seconds, default 60 minutes
                    IdentityTokenLifetime = 45,
                    AllowAccessTokensViaBrowser = true,
                    RedirectUris = new List<string>
                    {
                        "http://localhost:4200"
                    },
                    PostLogoutRedirectUris = new List<string>
                    {
                        "http://localhost:4200/unauthorized",
                        "http://localhost:4200"
                    },
                    AllowedCorsOrigins = new List<string>
                    {
                        "http://localhost:4200"
                    },
                    RequireClientSecret = false,
                    AllowedGrantTypes = GrantTypes.Code,
                    RequirePkce = true,
                    AllowedScopes = { "openid", "profile", "email", "SkillLearn_Api" },
                    AllowOfflineAccess = true,
                    RefreshTokenUsage = TokenUsage.OneTimeOnly
                },
            };
        }

        public static IEnumerable<ApiScope> GetApiScopes()
        {
            return new[]
            {
                new ApiScope(name: "SkillLearn_Api",   displayName: "API SkillLearn_Api")
            };
        }
    }
}