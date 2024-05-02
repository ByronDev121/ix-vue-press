# Bootstrap

## Bootstrap Example:

### Bootstrap Color Grid HTML:
```html
<div class="container mt-5">
        <h3>
            Bootstrap Tutorial
        </h3>
        <div class="mt-3">
            <div class="container">
                <div class="row">
                    <div class="col-4 color-grid-item box-1">
                        <div class="box-text">
                            Hello box-1
                        </div>
                    </div>
                    <div class="col-4 color-grid-item box-2">
                        <div class="box-text">
                            Hello box-2
                        </div>
                    </div>
                    <div class="col-4 color-grid-item box-3">
                        <div class="box-text">
                            Hello box-3
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-4 color-grid-item box-4">
                        <div class="box-text">
                            Hello box-4
                        </div>
                    </div>
                    <div class="col-8 color-grid-item box-5">
                        <div class="box-text">
                            Hello box-5
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
```


### Bootstrap Color Grid CSS:
```css
.color-grid-item {
  height: 250px;
  display: flex;
  align-items: center;
  border: 5px rgb(80, 80, 80) solid;
}

.box-text {
  margin: auto;
}

.box-1 {
  background-color: blue;
  color: white;
}

.box-2 {
  background-color: yellow;
  color: black;
}

.box-3 {
  background-color: rgb(4, 197, 4);
  color: black;
}

.box-4 {
  background-color: red;
  color: black;
}

.box-5 {
  background-color: rgb(207, 99, 211);
  color: black;
}
```