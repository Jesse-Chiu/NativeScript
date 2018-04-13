import { AppiumDriver, createDriver } from "nativescript-dev-appium";
import { Screen } from "./screen"
import {
    roots,
    setRoot,
    modalPageBackground,
    testSecondPageBackground,
    testNestedModalFrameBackground,
    testNestedModalPageBackground
} from "./shared.e2e-spec"

describe("modal page", () => {

    let driver: AppiumDriver;
    let screen: Screen;

    before(async () => {
        driver = await createDriver();
        screen = new Screen(driver);
    });

    roots.forEach(root => {
        describe(`${root} root modal page background scenarios`, () => {

            before(async () => {
                if (driver.isAndroid) {
                    await driver.resetApp();
                }
                await setRoot(root, screen);
            });

            beforeEach(async function () {
                await screen.loadModalPage();
            });

            afterEach(async function () {
                if (this.currentTest.state === "failed") {
                    await driver.logPageSource(this.currentTest.title);
                    await driver.logScreenshot(this.currentTest.title);
                    await driver.resetApp();
                    await setRoot(root, screen);
                }
            });

            after(async () => {
                await screen.closeModal();
                await screen.loadedHome();
            });

            it("should run modal page in background", async () => {
                await modalPageBackground(driver, screen, false);
            });

            it("should show nested modal page with frame, run in background, close", async () => {
                await testNestedModalFrameBackground(driver, screen, false);
            });

            it("should show nested modal page, run in background, close", async () => {
                await testNestedModalPageBackground(driver, screen, false);
            });
        });
    });
});
