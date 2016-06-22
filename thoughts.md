# Attributes

pb-is           class="pbi-"
pb-id,          id={id}
pb-state,       class="pbs-${state}"
pb-transition,  class="pbt-${direction}"

# Storage


const myStorage = new pb.Storage();
pb.Storage.listen(myStorage, 'foo.bar'. () => {

});
