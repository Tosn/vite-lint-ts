import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import user, { UserState } from './modules/user';

export interface State {
}

export interface InjectionState extends State {
  user: UserState
}

export const key: InjectionKey<Store<InjectionState>> = Symbol('vuex key');

export const store = createStore<InjectionState>({
  modules: {
    user,
  },
});
