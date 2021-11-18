export interface UserState {
  name: string;
  age: number
}
export default {
  state() {
    return {
      name: 'Tosn',
      age: 20,
    };
  },
};
