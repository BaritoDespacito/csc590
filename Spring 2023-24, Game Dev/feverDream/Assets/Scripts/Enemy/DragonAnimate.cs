using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DragonAnimate : MonoBehaviour
{
    private Animator dragonAnimator;

    private int MoveDist = 50;

    public GameObject player;

    // Start is called before the first frame update
    void Start()
    {
        dragonAnimator = GetComponent<Animator>();
        player = GameObject.FindGameObjectWithTag("Player");
    }

    // Update is called once per frame
    void Update()
    {
        if (Vector3.Distance(transform.position, player.transform.position) <= MoveDist)
        {
            if (dragonAnimator is null) return;
            if (!dragonAnimator.GetCurrentAnimatorStateInfo(0).IsName("Fly Forward"))
            {
                dragonAnimator.SetTrigger("isFlying");
            }
            Debug.Log("flying");
        }
        else
        {
            if (dragonAnimator is null) return;
            if (!dragonAnimator.GetCurrentAnimatorStateInfo(0).IsName("Fly Float 0"))
            {
                dragonAnimator.SetTrigger("isIdle");
            }
        }
    }
}
