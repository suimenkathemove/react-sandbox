# ReactNotionSortableTreeの仕様

- [ReactNotionSortableTreeの仕様](#reactnotionsortabletreeの仕様)
  - [機能](#機能)
    - [sort](#sort)
      - [border](#border)
        - [1番上のborder](#1番上のborder)
        - [中間のborder](#中間のborder)
        - [1番下のborder](#1番下のborder)
        - [リフトアップ](#リフトアップ)
      - [background](#background)

## 機能

- sort(並べ替え)
- collapse(折りたたみ)

### sort

NotionのSortableTreeのドロップ先の対象は、border(線)とbackground(背景)の2パターン。

#### border

##### 1番上のborder

1番上のborderにドロップした場合は、1番上の要素の兄にする。

##### 中間のborder

borderを挟む下の要素と上の要素のdepthを比較する。

下の要素のdepthが上の要素より大きい場合、「上の要素の弟にする」としてしまうと、下の要素の親が上の要素ではなくドロップ元の要素になってしまう。
よって、下の要素の兄にする。

リフトアップの機能によってdepthが大->小の移動はしやすいので、下の要素のdepthが上の要素以下の場合はなるべくdepthが大きくなるようにしたい。
よって、上の要素の弟にする。

##### 1番下のborder

1番下のborderにドロップした場合は、1番下の要素の弟にする。

##### リフトアップ

末っ子の要素から、その子孫の1番下の要素の下のborderにドロップした場合はリフトアップする(親の要素の末っ子にする)。

#### background

backgroundの場合は、ドロップ先の要素の子の末っ子にする。
