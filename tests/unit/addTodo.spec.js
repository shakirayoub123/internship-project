import {mount} from "@vue/test-utils";
import addTodo from "@/components/addTodo.vue";


const {

    createRouterMock,

    injectRouterMock

} = require('vue-router-mock')


describe('addTodo', () => {

    let wrapper;

    const mockRouter = {

        push: jest.fn()

    }

    const router = createRouterMock({})

    beforeEach(() => {

        injectRouterMock(router)

    })
    const updateWrapper = () => {

        wrapper = mount(addTodo, {

            global: {

                mocks: {

                    $router: mockRouter,
                    loading: false,
                }

            },
            data() {
                return {
                    loading: false
                }
            },

            created: jest.fn(),

            router: jest.fn(),

            stubs: ['router-link', 'required', 'loading']

        })

    }
    test('AddTodo be mounted', async () => {

        await expect(wrapper.exists()).toBeTruthy()

    })

})