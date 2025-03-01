import githubReducer, { fetchUsers, fetchRepos } from '@/redux/githubSlice';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

interface RootState {
  github: ReturnType<typeof githubReducer>;
}

const createTestStore = () =>
  configureStore({
    reducer: { github: githubReducer },
  });

describe('githubSlice', () => {
  let store: ReturnType<typeof createTestStore>;
  beforeEach(() => {
    store = createTestStore();
  });

  test('should handle initial state', () => {
    expect(store.getState().github).toEqual({
      users: [],
      repositories: [],
      loading: false,
      error: null,
    });
  });

  test('should fetch users successfully', async () => {
    const fakeUsers = [{ id: 1, login: 'testuser' }];
    mock.onGet(/https:\/\/api\.github\.com\/search\/users.*/).reply(200, { items: fakeUsers });

    await store.dispatch(fetchUsers('testuser') as ThunkDispatch<RootState, undefined, AnyAction>);
    expect(store.getState().github.users).toEqual(fakeUsers);
    expect(store.getState().github.loadingUser).toBe(false);
  });

  test('should fetch repositories successfully', async () => {
    const fakeRepos = [{ id: 1, name: 'test-repo' }];
    mock.onGet(/https:\/\/api\.github\.com\/users\/testuser\/repos/).reply(200, fakeRepos);

    await store.dispatch(fetchRepos('testuser') as ThunkDispatch<RootState, undefined, AnyAction>);
    expect(store.getState().github.repos).toEqual(fakeRepos);
    expect(store.getState().github.loadingRepo).toBe(false);
  });

  test('should handle API errors', async () => {
    mock.onGet(/https:\/\/api\.github\.com\/search\/users.*/).reply(404, 'Not Found');

    await store.dispatch(fetchUsers('invaliduser') as ThunkDispatch<RootState, undefined, AnyAction>);
    expect(store.getState().github.error).toBe('Not Found');
  });
});
