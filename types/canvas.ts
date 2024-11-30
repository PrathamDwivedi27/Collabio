export type Color={
    r:number;
    g:number;
    b:number;
}

export type Point={
    x:number;
    y:number;
}

export enum LayerType{
    Note,
    Rectangle,
    Ellipse,
    Path,
    Text
};

export type RectangleLayer={
    type:LayerType.Rectangle;
    x:number;
    y:number;
    width:number;
    height:number;
    fill:Color;
    value?:string;      //rectange ke pass ye property nhi rahegi lekin note ke pass rahegi isliye de diya taaki sabhi layer ke pass same property rhe
};

export type EllipseLayer={
    type:LayerType.Ellipse;
    x:number;
    y:number;
    width:number;
    height:number;
    fill:Color;
    value?:string;      //rectange ke pass ye property nhi rahegi lekin note ke pass rahegi isliye de diya taaki sabhi layer ke pass same property rhe
};

export type PathLayer={
    type:LayerType.Path;
    x:number;
    y:number;
    width:number;
    height:number;
    fill:Color;
    points:number[][];
    value?:string;      //rectange ke pass ye property nhi rahegi lekin note ke pass rahegi isliye de diya taaki sabhi layer ke pass same property rhe
};
export type TextLayer={
    type:LayerType.Text;
    x:number;
    y:number;
    width:number;
    height:number;
    fill:Color;
    value?:string;      //rectange ke pass ye property nhi rahegi lekin note ke pass rahegi isliye de diya taaki sabhi layer ke pass same property rhe
};

export type NoteLayer={
    type:LayerType.Rectangle;
    x:number;
    y:number;
    width:number;
    height:number;
    fill:Color;
    value?:string;      //rectange ke pass ye property nhi rahegi lekin note ke pass rahegi isliye de diya taaki sabhi layer ke pass same property rhe
};

export type XYWH={      //for traslation
    x:number;
    y:number;
    width:number;
    height:number;
}

export enum Side{
    Top=1,
    Bottom=2,
    Left=4,
    Right=8
}



export type CanvasState=| {
    mode:CanvasMode.None;
}
| {
    mode:CanvasMode.SelectionNet;
    origin:Point;
    current?:Point;
}
| {
    mode:CanvasMode.Translating;
    current:Point;

}
| {
    mode:CanvasMode.Inserting;
    layerType:LayerType.Ellipse | LayerType.Rectangle | LayerType.Note | LayerType.Text;
}
| {
    mode:CanvasMode.Resizing,
    initialBounds:XYWH,
    corner:Side;
}
| {
    mode:CanvasMode.Pencil;

}
| {
    mode:CanvasMode.Pressing,
    origin:Point
     ;
}

export enum CanvasMode{
    None,
    Pressing,
    SelectionNet,
    Translating,
    Inserting,
    Resizing,
    Pencil
}