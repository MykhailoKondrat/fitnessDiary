import { shallow, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import Workouts from "./Workouts";

describe("<Workouts/>", () => {
  const initialState = {
    workout: {
      history: [],
      loading: false,
      error: false,
      upToDate: true,
    },
    exercise: {
      availableExercises: [],
      selectedExercises: [],
      loading: false,
      error: null,
      upToDate: false,
    },
    auth: {
      logedIn: true,
      userId: "t5071EPYsKdchnKS5lwhdlqCBkG2",
      token:
        "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZjZmMyMzViZDYxMGZhY2FlYzVlYjBhZGU5NTg5ZGE5NTI4MmRlY2QiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZml0bmVzc2RpYXJ5LTc1OTVhIiwiYXVkIjoiZml0bmVzc2RpYXJ5LTc1OTVhIiwiYXV0aF90aW1lIjoxNTk1MzY1NTE4LCJ1c2VyX2lkIjoidDUwNzFFUFlzS2RjaG5LUzVsd2hkbHFDQmtHMiIsInN1YiI6InQ1MDcxRVBZc0tkY2huS1M1bHdoZGxxQ0JrRzIiLCJpYXQiOjE1OTUzNjU1MTgsImV4cCI6MTU5NTM2OTExOCwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3RAdGVzdC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.aDF0N2FyGyp8KdtLoLdz58TCfN0h9zIcRqtC8g6q9uhEsFtHJ0r4y6qSA3-lvV6ilh3vL1I2nugd7e2DFnWsp81sNoYAayBkfpTaD9MaU0yVWPG0Lcs463Duq_p6y6wfnzfIAoaOOAAKqSmnt5jEjwfRH_3KlKNwUdkgyeX117j1_ds6B-SaBHN2cNn2KnYKml-zww4boWPww1pZG0qsXrseIuTcOtpVa4MxSgktd6Y13BCy7gAkhij1LoWfc3bkd2OofKoTi7OzOvFnDN16j7VSueljuw9Q5iK4ixaRz1esKzvxgGaNuu8akUks7FinQvTvtG8cLzDAVVHiulIR8A",
      refreshToken:
        "AE0u-NfEg_lbgj08fGoKz8UnhX67Yn_dw59KG385IzhIT7bBYypAYFQWKFxK7s34nkcK03tz5zCZPFq5RxNZLUuDqtdSqo9WDDOnAv_GZg9mm1wPZK3o-H_WRG7JQ6P9w61Po4RtbpZlqbcEhjOORXoZFXiFOGsOAkMRFUqWLMtUP9nrmYSnDlZIBPHqi_5O0EnUZp8-csuvlQRC3QH8I4oAURUqqq77rA",
      expiresIn: 3600,
      error: null,
      loading: false,
    },
  };
  const mockStore = configureStore();
  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = mount(
      <Provider store={store}>
        <Workouts />
      </Provider>
    );
  });
  it("should render empty workout page by default", () => {
    expect(container.find("div.EmptyHistoryPlaceholderWrapper")).toHaveLength(
      1
    );
  });

  //   it('render correctly Input component', () => {
  //     const InputComponent = shallow(<Input valid={false} touched name type change value placeholder />);
  //     expect(shallowToJson(InputComponent)).toMatchSnapshot();
  //   });
});
