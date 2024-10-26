const app = `<script type="module" data-pg-name="Weather-Card-Pt-App">
import { createApp } from "https://unpkg.com/petite-vue?module";

const state = {
  weather: null,
  loading: true,
  error: '',
  getLocation() {
    navigator.geolocation.getCurrentPosition(
      async (pos) =>
        await this.fetchWeather(
          pos.coords.latitude,
          pos.coords.longitude
        ),
      async () => await this.fetchWeather(-37.7431, 144.7357) // Fallback coordinates - Caroline Springs
    )
  },
  async fetchWeather(lat, lon) {
    try {
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=b6cd22634f8f1c9a74704828f7f0523e&units=imperial'
      )
      if (!response.ok)
        throw new Error('Failed to fetch weather data')
      this.weather = await response.json()
    } catch (err) {
      this.error = err.message
    } finally {
      this.loading = false
    }
  },
  get weatherIcon() {
    return this.loading ? 'https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/icons/logo_16x16.png' : 'https://openweathermap.org/img/wn/'+this.weather.weather[0].icon+'@2x.png'
  }
}

createApp(state).mount(__MOUNT_POINT__) 
</script>`

const scope = `<div data-pg-name="Weather-Pt-Scope"__MOUNT_POINT__ class="p-4 relative hidden lg:block" v-scope="{}" v-on:vue:mounted="getLocation()">
    <p> <button id="dropdownButton" class="bg-primary-700 font-medium inline-flex items-center min-w-32 px-5 py-2.5 rounded-lg text-center text-sm text-white dark:bg-primary-600 dark:focus:ring-primary-800 dark:hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 hover:bg-primary-800" type="button" data-dropdown-toggle="dropdown" data-dropdown-offset-skidding="-65">
            <template v-if="loading">
                <span class="min-w-12">loading...</span>
            </template>
            <template v-else-if="error">
                <span class="min-w-12">Err</span>
            </template>
            <template v-else> <span class="min-w-12">{{weather.main.temp}}</span> 
            </template><span v-if="!loading" v-cloak="">&#176;</span><span class="ml-1" v-if="!loading" v-cloak="">F</span>
            <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6" v-if="!loading" v-cloak="">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"></path>
            </svg>
        </button></p>
    <div class="-translate-x-32 absolute bg-white dark:bg-gray-950 dark:text-gray-50 divide-gray-100 divide-y font-light hidden rounded-lg shadow text-gray-900 top-20 z-10" id="dropdown">
        <div class="flex flex-col gap-2 max-w-sm min-w-64 mx-auto p-4 rounded-lg shadow-lg" v-if="!loading">
            <p class="text-base">{{weather.name}}, {{weather.sys.country}}</p>
            <div class="flex items-center mb-2 space-x-2 text-sm">
                <img alt="Weather Icon" class="w-6 h-6 mr-2" :src="weatherIcon"/>
                <span class="font-semibold">{{weather.main.temp}}° C</span>
                <p class="capitalize">{{weather.weather[0].description}}</p>
            </div>
            <div class="flex flex-row items-center space-x-2 text-xs">
                <span>Low {{weather.main.temp_min}}°</span><span>High {{weather.main.temp_max}}°</span>
                <span>{{new Date().toDateString()}}</span>
                <img src="https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/icons/logo_16x16.png" alt="Weather Icon" class="w-6 h-6 mr-2"/>
            </div>
        </div>
    </div>
</div>`

const globalApp = [
  {
    injectTo: 'head',
    code: `<script src="https://cdn.jsdelivr.net/npm/flowbite@2.x/dist/flowbite.min.js" defer data-pg-name="Flowbite"></script>`,
  },
  {
    injectTo: 'body-prepend',
    app: app
      .replace('__MOUNT_POINT__', '')
      .replace(
        'data-pg-name="Weather-Card-Pt-App"',
        'data-pg-name="Global-Pt-App"',
      ),
    scope: scope.replace('__MOUNT_POINT__', ''),
    code: `${app
      .replace('__MOUNT_POINT__', '')
      .replace(
        'data-pg-name="Weather-Card-Pt-App"',
        'data-pg-name="Global-Pt-App"',
      )}
    ${scope.replace('__MOUNT_POINT__', '')}`,
  },
]

const island = [
  {
    injectTo: 'head',
    code: `<script src="https://cdn.jsdelivr.net/npm/flowbite@2.x/dist/flowbite.min.js" defer data-pg-name="Flowbite"></script>`,
  },
  {
    injectTo: 'body-prepend',
    app: app.replace('__MOUNT_POINT__', '"#weather-card"'),
    scope: scope.replace('__MOUNT_POINT__', ' id="weather-card"'),
    code: `<div data-pg-name="Weather-Card-Pt-Island">
    ${app.replace('__MOUNT_POINT__', '"#weather-card"')}
    ${scope.replace('__MOUNT_POINT__', ' id="weather-card"')}
</div>`,
  },
]

const sample = {
  name: 'weather-card', //
  label: 'Weather Card',
  helptext: 'Added to start of body tag.',
  globalApp,
  island,
  clientDirectiveKey: 'on:media',
  clientDirectiveValue: 'screen and (min-width: 1024px)',
}

export { sample }
export default sample
