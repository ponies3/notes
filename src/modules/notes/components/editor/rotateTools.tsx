import { Button } from "@/components/ui/button";
import { RotateCcw, RotateCw } from "lucide-react";
import {
  DefaultStylePanel,
  DefaultStylePanelContent,
  useEditor,
  useRelevantStyles,
} from "tldraw";

const ROTATE_LEFT = -Math.PI / 2;
const ROTATE_RIGHT = Math.PI / 2;
const ONE_ROTATION = Math.PI * 2;

export function RotateOneShape() {
  const editor = useEditor();
  const styles = useRelevantStyles();

  const rotateShape = (radiants: number) => {
    const isOneShape = editor.getSelectedShapeIds().length === 1;
    if (!isOneShape) {
      return;
    }

    const shapeId = editor.getSelectedShapeIds()[0];
    if (!shapeId) {
      return;
    }

    const shape = editor.getShape(shapeId);
    if (!shape) {
      return;
    }

    let newRotation = shape.rotation + radiants;

    if (newRotation >= ONE_ROTATION) {
      newRotation = newRotation - ONE_ROTATION;
    }

    if (newRotation < 0) {
      newRotation = ONE_ROTATION + newRotation;
    }

    editor.updateShape({
      id: shapeId,
      rotation: newRotation,
      type: shape.type,
    });
  };

  return (
    <DefaultStylePanel>
      <DefaultStylePanelContent styles={styles} />
      <div className={`flex h-fit w-full flex-row justify-between gap-2 p-2`}>
        <Button
          className="pointer-events-auto"
          onClick={() => rotateShape(ROTATE_LEFT)}
        >
          <RotateCcw />
        </Button>
        <Button
          className="pointer-events-auto"
          onClick={() => rotateShape(ROTATE_RIGHT)}
        >
          <RotateCw />
        </Button>
      </div>
    </DefaultStylePanel>
  );
}
