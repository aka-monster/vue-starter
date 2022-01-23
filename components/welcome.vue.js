var homeComponent = Vue.component("Home", {
  template: `<div>
  <h1>{{ $t("message.welcome") }}</h1>

  <div class="row gy-2">
  <h4>Fast and furious way to build web thingies</h4>
  <p>
  Hello, this web starter app is a quick way to use modern technologies to build a simple website.<br>
  All of that, without <i>much</i> setup or learning curve, a.k.a the hacker weay<br>
  The demo uses couple public/free services to get information about local weather and crypto,
  because <b>noone</b> can predit any of that :)<br>
  Feel free to download, make changes, test, break and learn new things<br>
  </div>

  <div class="row gy-2">
  <h4>Disclaimer</h4>
  <p>This demo is not intended to be a production ready application, MIT license terms:</p>
  <p>
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</p>
  </div>

  </div>`,
});
