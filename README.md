## Installation

```bash
npm install
npm run serve
```

Now visit http://localhost:8080/

## How to add new experiments

Each experiment typically consists of ts file, html file and optionally a
scss file.

```
1) Create /public/{name}.html file
2) Create typescript or javascript file.
   /public/{name}.ts file or /public/{name}.js file
3) Create /public/{name}.scss file (optional)
```


Add add your sass, at the top of your {name}.ts file add:

```
import './{name}.scss';
```

Now start the project with `npm run serve` and visit: http://localhost:8080/{name}.html
and you'll see your experiment.
