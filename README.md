# Almost universal Webpack assembly

### Installing
Clone or download this Repository

```
Install all modules: npm i
```

## before start:
Check folder src/scss/basik & src/scss/customize & src/js/helpers and stydy all files. They can make your workflow easier

If you use fontsTypography mixin for add font in your project create your folders as in the example (fonts/OpenSans).
Default type fonts in this mixin: woff and woff2. If you need add other types change fontsTypography mixin.

```
webpack-loader check all type fonts in base config
```

If you add some image in project use backgroundImage mixin.
```
example:  @include backgroundImage("imageName.[ext]");
or: background-image: url("/images/imageName.[ext]");
```
but if you work with wordPress and you want change background image from admin panel you must write this style in html file:
```
<div class="class-name" style="background-image: url('imageName.[ext]');"> 
```