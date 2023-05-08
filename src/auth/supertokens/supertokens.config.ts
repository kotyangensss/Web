import ThirdParty from 'supertokens-node/recipe/thirdparty';
import Session from 'supertokens-node/recipe/session';
import Dashboard from 'supertokens-node/recipe/dashboard';

export const appInfo = {
  appName: 'starege-xdd',
  apiDomain: process.env.HOST,
  websiteDomain: process.env.HOST,
  apiBasePath: '/api/auth',
  websiteBasePath: '/auth',
};

export const connectionUri =
  'https://dev-ef8ddee1ecc811edbb8a5baa3bc17058-eu-west-1.aws.supertokens.io:3571';
export const apiKey = 'MExqgEIO96zCt3APRLIjUbfovEx5l=';

export const recipeList = [
  ThirdParty.init({
    signInAndUpFeature: {
      providers: [
        ThirdParty.Google({
          clientId:
            '1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com',
          clientSecret: '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',
        }),
      ],
    },
  }),
  Session.init(),
  Dashboard.init(),
];
