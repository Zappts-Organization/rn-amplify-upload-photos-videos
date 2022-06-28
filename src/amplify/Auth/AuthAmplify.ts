import { Amplify, Auth } from "aws-amplify";

import awsmobile from "../../aws-exports";

import {
  identityPoolId,
  region,
  userPoolId,
  userPoolWebClientId,
  bucket,
  disabled,
} from "@env";

function authAmplify() {
  Amplify.configure({
    Auth: {
      identityPoolId: identityPoolId,
      region: region,
      userPoolId: userPoolId,
      userPoolWebClientId: userPoolWebClientId,
    },
    Storage: {
      AWSS3: {
        bucket: bucket,
        region: region,
      },
    },
    Analytics: {
      disabled: disabled,
    },
  });

  Auth.configure(awsmobile);
}

export default authAmplify;
