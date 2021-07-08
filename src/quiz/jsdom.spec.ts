import { JSDOM } from "jsdom";

describe("jsdom", () =>
{
    it('should render hello world', () => 
    {
        const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
        expect(dom.window.document.body.querySelector("p")?.textContent).toBe('Hello world');
    })

    it('appends an element fine', () => {
        const dom = new JSDOM(`
            <html>
                <body>
                    <h1>Hello world!</h1>
                    <script>
                        const h2 = document.createElement("h2");
                        h2.append("from Auckland");
                        document.body.append(h2);
                    </script>
                </body>
            </html>
        `, { 'runScripts': 'dangerously' });
        expect(dom.window.document.body.querySelector('h2')?.textContent).toBe('from Auckland');
    });
    
    it('loads a URL fine', async () => {
        const dom = await JSDOM.fromURL('https://google.com/', { 'runScripts': 'dangerously', 'resources': 'usable' });
        const query = dom.window.document.body.querySelector<HTMLInputElement>('input[name=q]');
        query!.value = "tiger";
    });
})