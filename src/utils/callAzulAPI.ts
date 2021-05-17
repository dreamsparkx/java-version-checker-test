import axios, { AxiosPromise } from 'axios';

export function callAzulAPI(
  osVersion: string,
  bundleType: string = 'jdk',
  supportTerm: string = 'lts'
): AxiosPromise {
  return axios({
    method: 'get',
    params: {
      os: osVersion,
      bundle_type: bundleType,
      support_term: supportTerm
    },
    url: 'https://api.azul.com/zulu/download/community/v1.0/bundles'
  });
}
