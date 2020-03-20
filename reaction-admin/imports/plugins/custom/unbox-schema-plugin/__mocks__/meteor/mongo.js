export const Mongo = {
  Collection: class Collection {
    attachSchema() {}

    insert() {
      return { _id: 'fake_mongo_collection_id' };
    }

    findOne() {}
  }
};
