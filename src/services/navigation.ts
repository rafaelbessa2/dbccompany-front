import React from "react";

export let navigationRef: any = React.createRef();

export default function setNavigationRef(ref: any) {
  navigationRef = ref;
}

export function navigate(route: string) {
  navigationRef.push(route);
}
export function refreshPage() {
  navigationRef.go(0);
}
