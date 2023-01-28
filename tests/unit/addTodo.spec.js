// import {mount} from '@vue/test-utils';
// import addTodo from "@/components/addTodo.vue";
//
// const {
//     createRouterMock,
//     injectRouterMock
// } = require('vue-router-mock')
//
// describe('addTodo routing', () => {
//
//     let wrapper;
//
//     const mockRouter = {
//
//         push: jest.fn()
//
//     }
//     const router = createRouterMock({})
//
//     beforeEach(() => {
//
//         injectRouterMock(router)
//
//     })
//     const updateWrapper = () => {
//
//         wrapper = mount(addTodo, {
//
//             global: {
//
//                 mocks: {
//
//                     $router: mockRouter,
//                     loading: false,
//                 }
//
//             },
//             data() {
//                 return {
//                     loading: false
//                 }
//             },
//
//             created: jest.fn(),
//
//             router: jest.fn(),
//
//             stubs: ['router-link', 'required', 'loading']
//
//         })
//
//     }
//     beforeEach(function () {
//
//         updateWrapper();
//
//     })
//     test('addTodo be mounted', async () => {
//
//         await expect(wrapper.exists()).toBeTruthy()
//
//     })
//
//     test('route for params id', async () => {
//
//         const id = 1
//
//         expect(wrapper.exists(id)).toBe(true);
//
//     });
//     // checking input fields
//     test('testing the input', async () => {
//
//         expect(wrapper.findAll('input').length).toEqual(3)
//         expect(wrapper.findAll('input').at(0).text()).toMatch('')
//         expect(wrapper.findAll('input').at(1).text()).toMatch('')
//         expect(wrapper.findAll('input').at(2).text()).toMatch('')
//     })
//     test('sets the value in input field', async () => {
//
//         const input = wrapper.find('input')
//
//         await input.setValue('new todo')
//
//         expect(input.element.value).toBe('new todo')
//     })
//     // test('trigger', async () => {
//     //
//     //    await expect(wrapper.findAll('submit').length).toEqual(2)
//     //     expect(wrapper.findAll('submit').at(0).text()).toMatch('Add')
//     //     expect(wrapper.findAll('submit').at(1).text()).toMatch('Cancel')
//     //
//     // })
//
//
// })
//
// done
//
import {mount} from '@vue/test-utils'
import {createStore} from "vuex";
import addTodo from "@/components/addTodo.vue";


const {
    createRouterMock,
    injectRouterMock
} = require('vue-router-mock')

describe('addTodo routing', () => {

    let wrapper;

    const mockRouter = {

        push: jest.fn()

    }
    const router = createRouterMock({})

    beforeEach(() => {

        injectRouterMock(router)

    })
    const store = createStore()
    const updateWrapper = () => {

        wrapper = mount(addTodo, {

            global: {

                mocks: {

                    $router: mockRouter,
                    loading: false,
                },
                global: {
                    plugins: [store]
                }

            },
            data() {
                return {
                    loading: false
                }
            },

            created: jest.fn(),

            router: jest.fn(),

            stubs: ['router-link', 'required']

        })

    }
    beforeEach(function () {

        updateWrapper();

    })
    test('addTodo be mounted', async () => {

        await expect(wrapper.exists()).toBeTruthy()

    })

    test('route for params id', async () => {

        const id = 1

        expect(wrapper.exists(id)).toBe(true);

    });
    test('testing the input', async () => {

        expect(wrapper.findAll('input').length).toEqual(3)
        expect(wrapper.findAll('input').at(0).text()).toMatch('')
        expect(wrapper.findAll('input').at(1).text()).toMatch('')
        expect(wrapper.findAll('input').at(2).text()).toMatch('')
    })
        test('sets the value in input field', async () => {

        const input = wrapper.find('input')

        await input.setValue('new todo')

        expect(input.element.value).toBe('new todo')
    })
})
