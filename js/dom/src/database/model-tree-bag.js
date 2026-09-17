// Copyright 2026 Softwell S.r.l. - SPDX-License-Identifier: Apache-2.0
import {Bag} from 'genro-bag-js';

/** Presentation mapping only; model paths use relation IDs, not Bag node labels. */
export function modelTreeBag(tree) {
    const branch = node => {
        const bag = new Bag();
        for (const [index, [field, descriptor]] of Object.entries(node.fields).entries()) {
            bag.setItem(`f_${index}`, null, {caption:descriptor.label || field,
                kind:'field',node_kind:'column',table:node.table,field,field_name:field,
                dtype:descriptor.dtype,nullable:descriptor.nullable,primaryKey:node.identity.includes(field)});
        }
        node.children.forEach((child, index) => {
            const edge = child.relation;
            const caption = `${edge.sourceFields.join(', ')} → ${child.table} (${edge.cardinality}${edge.inverse ? ', inverse' : ''})${child.cycle ? ' ↻' : ''}`;
            bag.setItem(`r_${index}`, child.cycle ? null : branch(child), {caption,kind:'relation',table:child.table,
                node_kind:'relation', dtype:node.fields[edge.sourceFields[0]].dtype,
                relation_direction:edge.inverse ? 'descending' : 'ascending',
                relationId:edge.id,cardinality:edge.cardinality,inverse:edge.inverse,cycle:child.cycle,
                modelPath:JSON.stringify(child.path)});
        });
        if (node.truncated) bag.setItem('limit', null, {caption:'Traversal limit reached',kind:'limit',node_kind:'group'});
        return bag;
    };
    // relationTree already supplies its table root.
    return branch(tree);
}
