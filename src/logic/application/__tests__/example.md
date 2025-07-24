import { appCreateStore } from "@/logic/application/redux/store";
import { RootState } from "@/logic/application/redux/store";
import { SomeEntity } from "@/logic/domain/entities/SomeEntity";
import { SomeRepository } from "@/logic/domain/repos/SomeRepository";
import { someThunk } from "@/logic/application/redux/slices/some/someThunks";

describe("someThunk", () => {
const mockRepo: SomeRepository = {
doSomething: jest.fn(async (input) => {
// Retourne une entité simulée
return { id: "1", name: "Mocked" } as SomeEntity;
}),
};

const createTestStore = () =>
appCreateStore({
someRepo: mockRepo,
});

it("should dispatch pending and success on valid input", async () => {
const store = createTestStore();

    await store.dispatch<any>(someThunk("input"));

    const state: RootState = store.getState();
    expect(state.someReducer.data?.name).toBe("Mocked");
    expect(state.someReducer.loading).toBe(false);
    expect(state.someReducer.error).toBe(null);

});

it("should dispatch pending and failure on error", async () => {
const mockFailingRepo: SomeRepository = {
doSomething: jest.fn().mockRejectedValue(new Error("Boom")),
};

    const store = appCreateStore({ someRepo: mockFailingRepo });

    await store.dispatch<any>(someThunk("bad input"));

    const state = store.getState();
    expect(state.someReducer.error).toBe("Boom"); // ou ton message custom
    expect(state.someReducer.loading).toBe(false);

});
});
