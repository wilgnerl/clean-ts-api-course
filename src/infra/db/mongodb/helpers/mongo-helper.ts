import { type Collection, MongoClient } from 'mongodb';

export const MongoHelper = {
  client: null as MongoClient | null,
  url: null as unknown as string,
  async connect(url: string): Promise<void> {
    this.client = await MongoClient.connect(url);
    this.url = url;
  },

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
    }
    this.client = null;
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client) {
      if (!this.url) {
        throw new Error('URL for MongoDB not defined.');
      }
      await this.connect(this.url);
    }

    if (!this.client) {
      throw new Error('Client is not connected.');
    }

    return this.client.db().collection(name);
  },

  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection;
    return Object.assign({}, collectionWithoutId, {
      id: _id.toString(),
    });
  },
};
