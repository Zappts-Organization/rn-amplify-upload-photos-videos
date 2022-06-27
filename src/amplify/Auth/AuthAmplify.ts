import { Amplify, Auth } from "aws-amplify";
import {
  identityPoolId,
  region,
  userPoolId,
  userPoolWebClientId,
  bucket,
  disabled,
} from "@env";

import awsmobile from "../../aws-exports";

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

const AuthAmplify = () => null;

export { AuthAmplify };
