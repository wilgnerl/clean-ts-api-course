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
      await this.connect(this.url);
    }

    return this.client!.db().collection(name);
  },

  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection;
    return Object.assign({}, collectionWithoutId, {
      id: _id.toString(),
    });
  },
};
