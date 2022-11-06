import { Client } from '@opensearch-project/opensearch';

export class OpenSearchClient {
  public client: Client;

  constructor() {
    this.client = new Client({
      node: process.env.OPENSEARCH_NODE,
      auth: {
        username: process.env.OPENSEARCH_USERNAME,
        password: process.env.OPENSEARCH_PASSWORD,
      },
      ssl: {
        ca: process.env.OPENSEARCH_SSL_CA_PATH,
        rejectUnauthorized: false,
      },
    });
  }
}
