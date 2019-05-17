const { stageSpec: makeStageSpec } = require('../make')


function stage(node) {
  const spec = makeStageSpec();
  if (node.target) {
    spec.target = node.target;
  }
  if (node.duration) {
    spec.duration = node.duration;
  }

  return spec;
}

module.exports = stage
