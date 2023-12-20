import NextAuth, { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    {
      id: "prosper",
      name: "Prosper",
      type: "oauth",
      clientId: process.env.PROSPER_ID,
      clientSecret: process.env.PROSPER_SECRET,
      scope: `read_user_profile
      read_prosper_account  
      read_invest_order                                                                      
      write_invest_order 
      read_loan read_note 
      read_listing`,
      authorization: {
        url: "https://www.prosper.com/oauth",
        params: {
          response_type: "auth_key",
        }
      },
      token: "https://api.prosper.com/v1/security/oauth/token",
    },
  ],
};

export const handler = NextAuth(
  authOptions);

export { handler as GET, handler as POST };
